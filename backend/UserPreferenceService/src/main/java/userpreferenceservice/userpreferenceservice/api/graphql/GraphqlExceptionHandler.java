package userpreferenceservice.userpreferenceservice.api.graphql;

import graphql.GraphQLError;
import graphql.GraphqlErrorBuilder;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.graphql.data.method.annotation.GraphQlExceptionHandler;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class GraphqlExceptionHandler {

    @GraphQlExceptionHandler(IllegalArgumentException.class)
    public GraphQLError handleIllegalArgument(IllegalArgumentException ex, DataFetchingEnvironment environment) {
        return GraphqlErrorBuilder.newError(environment)
                .errorType(ErrorType.BAD_REQUEST)
                .message(ex.getMessage() != null ? ex.getMessage() : "Bad request")
                .build();
    }

    @GraphQlExceptionHandler(IllegalStateException.class)
    public GraphQLError handleIllegalState(IllegalStateException ex, DataFetchingEnvironment environment) {
        return GraphqlErrorBuilder.newError(environment)
                .errorType(ErrorType.UNAUTHORIZED)
                .message(ex.getMessage() != null ? ex.getMessage() : "Unauthorized")
                .build();
    }
}
