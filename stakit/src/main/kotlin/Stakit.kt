import com.github.kittinunf.fuel.httpGet
import com.google.gson.JsonParser
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.content.default
import io.ktor.content.files
import io.ktor.content.static
import io.ktor.content.staticRootFolder
import io.ktor.gson.gson
import io.ktor.response.respond
import io.ktor.routing.get
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import java.io.File

fun main(args: Array<String>) {
    if (args.size != 1) {
        throw Exception("Path to static resources should be passed")
    }
    val server = embeddedServer(Netty, 8080) {
        main(args[0])
    }
    server.start(wait = true)
}

data class SearchResponse(val items: List<Answer>, val hasMore: Boolean)
data class Answer(val id: Long,
                  val image: String,
                  val externalLink: String,
                  val title: String,
                  val answered: Boolean,
                  val creationDate: Long)

fun Application.main(pathToStatic: String) {
    install(io.ktor.features.DefaultHeaders)
    install(io.ktor.features.Compression)
    install(io.ktor.features.CallLogging)
    install(io.ktor.features.ContentNegotiation) {
        gson {
            setDateFormat(java.text.DateFormat.LONG)
            setPrettyPrinting()
        }
    }

    routing {
        static("/") {
            staticRootFolder = File(pathToStatic)
            files(".")
            default("index.html")
        }
        get("/search") {
            val page = verifyIntParam(call.request.queryParameters["page"], { it in 1..99 })
            if (page == null) {
                call.respond(io.ktor.http.HttpStatusCode.BadRequest, "Wrong page value")
            }

            val limit = verifyIntParam(call.request.queryParameters["limit"], { it in 10..100 })
            if (limit == null) {
                call.respond(io.ktor.http.HttpStatusCode.BadRequest, "Wrong limit value")
            }

            val text = call.request.queryParameters["text"]
            if (text == null || text.length < 3) {
                call.respond(io.ktor.http.HttpStatusCode.BadRequest, "Wrong text value")
            }

            val (request, response, result) =
                    "http://api.stackexchange.com/2.2/search"
                            .httpGet(listOf(
                                    "page" to page,
                                    "pagesize" to limit,
                                    "key" to "U4DMV*8nvpm3EOpvf69Rxw((",
                                    "site" to "stackoverflow",
                                    "order" to "desc",
                                    "intitle" to text,
                                    "filter" to "default"
                            ))
                            .responseString()

            result.fold({ data ->
                call.respond(convert(data))
            }, { err ->
                call.respond(io.ktor.http.HttpStatusCode.fromValue(err.response.statusCode), err.response.responseMessage)
            })
        }
    }
}

private fun convert(stackexchangeResponse: String): SearchResponse {
    val root = JsonParser().parse(stackexchangeResponse).getAsJsonObject()

    return SearchResponse(root.getAsJsonArray("items").map { item ->
        val owner = item.asJsonObject.getAsJsonObject("owner")
        Answer(item.asJsonObject.get("question_id").asLong,
                if (owner.has("profile_image")) owner["profile_image"].asString else "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv-XExE8ccRtmLq1_AtqowFjK54WwD424B9m5m_m7t3kCT5hPm",
                item.asJsonObject.get("link").asString,
                item.asJsonObject.get("title").asString,
                item.asJsonObject.get("is_answered").asBoolean,
                item.asJsonObject.get("creation_date").asLong)
    }, root.get("has_more").asBoolean)
}

private fun verifyIntParam(param: String?, conversion: (Int) -> Boolean): Int? {
    if (param == null) {
        return null
    }
    val paramInt = param.toIntOrNull() ?: return null
    if (!conversion(paramInt)) {
        return null
    }
    return paramInt
}