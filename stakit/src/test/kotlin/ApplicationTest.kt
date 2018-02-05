import io.ktor.application.*
import io.ktor.http.*
import io.ktor.server.testing.*
import org.junit.Test
import kotlin.test.*

class ApplicationTest {

    @Test
    fun testRequest() = withTestApplication({ main("") }) {
        with(handleRequest(HttpMethod.Get, "/search?page=1&limit=50&text=kotlin") {
            addHeader("Accept", "application/json")
        }) {
            assertNotNull(response.content)
            assertTrue(response.content!!.isNotEmpty())
            assertEquals(HttpStatusCode.OK, response.status())
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