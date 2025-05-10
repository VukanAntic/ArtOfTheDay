package userpreferenceservice.userpreferenceservice.api.rest;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import userpreferenceservice.userpreferenceservice.common.service.UserPreferenceService;
import userpreferenceservice.userpreferenceservice.infra.mongo.entity.UserPreferenceMongoEntity;
import userpreferenceservice.userpreferenceservice.infra.mongo.repository.UserPreferenceMongoRepository;

@RestController
@RequestMapping(value = "/api/preference", produces = {
        "application/json",
        "application/x-protobuf"
})
@AllArgsConstructor
public class UserPreferenceController {

    private final UserPreferenceService userPreferenceService;
    private final UserPreferenceMongoRepository mongoRepository;

    @GetMapping("/test")
    public String test() {
        mongoRepository.insert(new UserPreferenceMongoEntity());
        return "all g";
    }

}
