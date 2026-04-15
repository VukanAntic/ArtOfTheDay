package common.common.config;

import org.apache.commons.csv.CSVFormat;
import org.springframework.core.io.ClassPathResource;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class CsvConfigLoader {

    public static Map<String, String> load(String classpathFile) throws IOException {
        var resource = new ClassPathResource(classpathFile);
        try (var reader = new BufferedReader(new InputStreamReader(resource.getInputStream()))) {
            var parser = CSVFormat.DEFAULT.builder()
                    .setHeader()
                    .setSkipHeaderRecord(true)
                    .build()
                    .parse(reader);

            var result = new HashMap<String, String>();
            for (var record : parser) {
                result.put(record.get("property"), record.get("value"));
            }
            return result;
        }
    }

    private CsvConfigLoader() {}
}
