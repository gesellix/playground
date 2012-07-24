package de.gesellix;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.OK;

@Controller
@RequestMapping(value = "/mappings.html")
public class MappingDocumentationServlet {

  @ResponseStatus(OK)
  public
  @ResponseBody
  String getMappings() {
    return "hello world";
  }
}
