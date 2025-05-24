package backend.nextimageservice.api.rest;

import backend.nextimageservice.common.DTO.SetPreferredTimeForUpdateDTO;
import backend.nextimageservice.common.service.NextImageService;
import common.common.authentication.AuthenticatedUser;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.TimeZone;

@RestController
@RequestMapping(value = "/api/next-image", produces = {
        "application/json",
        "application/x-protobuf"
})
@AllArgsConstructor
public class NextImageController {

    private final NextImageService nextImageService;

    @GetMapping("/test")
    public void test(TimeZone timeZone) {
        System.out.println(timeZone);
    }

    @PostMapping("/set-preferred-time-for-update")
    public ResponseEntity<Void> setPreferredTimeForUpdate(
            @RequestBody SetPreferredTimeForUpdateDTO setPreferredTimeForUpdateDTO,
            TimeZone timeZone) {
        var username = AuthenticatedUser.getUsername();
        if (username == null) {
            return ResponseEntity.notFound().build();
        }

        nextImageService.SetPreferredTimeForUser(username,
                timeZone.getID(),
                setPreferredTimeForUpdateDTO.getPreferredTimeInHours(),
                setPreferredTimeForUpdateDTO.getPreferredTimeInMinutes());
        return ResponseEntity.ok().build();
    }
}
