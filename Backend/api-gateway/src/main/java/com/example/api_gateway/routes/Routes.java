package com.example.api_gateway.routes;

import org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.function.RequestPredicates;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

@Configuration
public class Routes {

    @Bean
    public RouterFunction<ServerResponse> userServiceRoute() {
        return GatewayRouterFunctions.route("authentication_service")
            .route(
                RequestPredicates.path("/AuthenticationService/**")
                    .and(RequestPredicates.method(HttpMethod.OPTIONS)
                        .or(RequestPredicates.method(HttpMethod.POST))
                        .or(RequestPredicates.method(HttpMethod.GET))
                    ),
                HandlerFunctions.http("http://localhost:8082")
            )
            .build();
    }
}
