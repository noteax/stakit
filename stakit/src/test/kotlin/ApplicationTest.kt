import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.server.testing.handleRequest
import io.ktor.server.testing.withTestApplication
import org.junit.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class ApplicationTest {

    @Test
    fun testRequest() = withTestApplication({ main("") }) {
        for (i in 1 until 10) {
            with(handleRequest(HttpMethod.Get, "/search?page=$i&limit=50&text=kotlin") {
                addHeader("Accept", "application/json")
            }) {
                assertNotNull(response.content)
                assertTrue(response.content!!.isNotEmpty())
                assertEquals(HttpStatusCode.OK, response.status())
            }
        }
    }

    @Test
    fun testIncorrectPage() = withTestApplication({ main("") }) {
        with(handleRequest(HttpMethod.Get, "/search?page=0&limit=50&text=kotlin") {
            addHeader("Accept", "application/json")
        }) {
            assertEquals(HttpStatusCode.BadRequest, response.status())
        }
    }

    @Test
    fun testIncorrectLimit() = withTestApplication({ main("") }) {
        with(handleRequest(HttpMethod.Get, "/search?page=1&limit=1000&text=kotlin") {
            addHeader("Accept", "application/json")
        }) {
            assertEquals(HttpStatusCode.BadRequest, response.status())
        }
    }


}