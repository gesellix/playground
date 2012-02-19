package de.gesellix;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.File;
import java.io.FileFilter;
import java.util.Arrays;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller("playgroundServlet")
@RequestMapping("/*")
public class PlaygroundServlet {

    @RequestMapping(value = "/init", method = POST)
    @ResponseStatus(OK)
    public
    @ResponseBody
    List<File> init(@RequestBody InitConfig initConfig) {
        // z.B. Request mit Body {"fileRoot":"c:/Users/gesellix"}
        String rootDir = getRootDir(initConfig);
        File[] files = new File(rootDir).listFiles(acceptMp3FilesAndDirectories());

        return Arrays.asList(files);
    }

    private String getRootDir(InitConfig initConfig) {
        String rootDir = initConfig.getFileRoot();
        if (StringUtils.isEmpty(rootDir)) {
            rootDir = System.getProperty("user.home");
        }
        return rootDir;
    }

    private FileFilter acceptMp3FilesAndDirectories() {
        return new FileFilter() {
            @Override
            public boolean accept(File pathname) {
                if (pathname == null) {
                    return false;
                }

                String name = pathname.getName();
                if (name.startsWith(".")) {
                    return false;
                }

                if (pathname.isDirectory()) {
                    return true;
                }

                return name.endsWith("*.mp3");
            }
        };
    }
}
