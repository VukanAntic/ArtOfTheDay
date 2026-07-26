package identityservice.identityservice.api.graphql;

import identityservice.identityservice.common.Tokens.CurrentUser;
import identityservice.identityservice.common.services.UserService;
import identityservice.identityservice.infra.entities.User;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

@Controller
@AllArgsConstructor
public class UserGraphqlController {

    private final UserService userService;

    @QueryMapping
    public User currentUser() {
        return userService.getCurrentUser(requireCurrentUser())
                .orElseThrow(() -> new IllegalStateException("User not found"));
    }

    @MutationMapping
    public User changeEmail(@Argument String newEmail) {
        return userService.changeEmail(requireCurrentUser(), newEmail)
                .orElseThrow(() -> new IllegalArgumentException("Unable to change email!"));
    }

    @MutationMapping
    public User changePassword(@Argument String oldPassword, @Argument String newPassword) {
        return userService.changePassword(requireCurrentUser(), oldPassword, newPassword)
                .orElseThrow(() -> new IllegalArgumentException("Unable to change password!"));
    }

    @MutationMapping
    public User changeName(@Argument String newFirstName, @Argument String newLastName) {
        return userService.changeFirstAndLastName(requireCurrentUser(), newFirstName, newLastName)
                .orElseThrow(() -> new IllegalArgumentException("Unable to change first and last name!"));
    }

    @MutationMapping
    public boolean deleteUser(@Argument String username) {
        return userService.deleteUser(requireCurrentUser(), username).isPresent();
    }

    private CurrentUser requireCurrentUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof CurrentUser currentUser)) {
            throw new IllegalStateException("No authenticated user");
        }
        return currentUser;
    }
}
