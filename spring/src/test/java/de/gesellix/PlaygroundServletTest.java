package de.gesellix;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.http.MediaType;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.io.StringWriter;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.server.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.server.setup.MockMvcBuilders.standaloneSetup;

@Test
public class PlaygroundServletTest {

    private PlaygroundServlet playgroundServlet;

    @BeforeMethod
    public void setup() {
        playgroundServlet = new PlaygroundServlet();
    }

    @Test
    public void testInit() throws Exception {

        ObjectMapper mapper = new ObjectMapper();
        StringWriter stringWriter = new StringWriter();

        InitConfig initConfig = new InitConfig();
        initConfig.setFileRoot("c:\\Users\\gesellix");

        mapper.writeValue(stringWriter, initConfig);

        standaloneSetup(playgroundServlet).build()
                .perform(post("/init")
                        .contentType(APPLICATION_JSON)
                        .body(stringWriter.toString().getBytes()))
                .andExpect(status().isOk());
    }
}
