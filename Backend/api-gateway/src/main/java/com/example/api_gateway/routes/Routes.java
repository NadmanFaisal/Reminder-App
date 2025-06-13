package com.example.api_gateway.routes;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.function.RequestPredicates;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import com.example.api_gateway.filter.JwtFilter;

@Configuration
public class Routes {

    @Value("${IP_ADDRESS}")
    private String ipAddress;

    private final JwtFilter jwtFilter;

    public Routes(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public RouterFunction<ServerResponse> userServiceRoute() {
        return GatewayRouterFunctions.route("api-gateway")
            .route(
                RequestPredicates.path("/AuthenticationService/**")
                    .and(RequestPredicates.method(HttpMethod.OPTIONS)
                        .or(RequestPredicates.method(HttpMethod.POST))
                        .or(RequestPredicates.method(HttpMethod.GET))),
                HandlerFunctions.http("http://authentication-service:8082")
            )
            .route(
                RequestPredicates.path("/LoggingService/**")
                    .and(RequestPredicates.method(HttpMethod.OPTIONS)
                        .or(RequestPredicates.method(HttpMethod.POST))
                        .or(RequestPredicates.method(HttpMethod.GET))),
                request -> jwtFilter.filter(request,
                    req -> HandlerFunctions.http("http://logging-service:8083").handle(req)
                )
            )
            .route(
                RequestPredicates.path("/NotificationService/**")
                    .and(RequestPredicates.method(HttpMethod.OPTIONS)
                        .or(RequestPredicates.method(HttpMethod.POST))
                        .or(RequestPredicates.method(HttpMethod.PUT))
                        .or(RequestPredicates.method(HttpMethod.PATCH))
                        .or(RequestPredicates.method(HttpMethod.DELETE))
                        .or(RequestPredicates.method(HttpMethod.GET))),
                request -> jwtFilter.filter(request,
                    req -> HandlerFunctions.http("http://notification-service:8084").handle(req)
                )
            )
            // .route(
            //     RequestPredicates.path("/NotificationService/**")
            //         .and(RequestPredicates.method(HttpMethod.OPTIONS)
            //             .or(RequestPredicates.method(HttpMethod.POST))
            //             .or(RequestPredicates.method(HttpMethod.GET))
            //             .or(RequestPredicates.method(HttpMethod.PUT))
            //             .or(RequestPredicates.method(HttpMethod.PATCH))),
            //     HandlerFunctions.http("http://localhost:8084")
            // )
            .route(
                RequestPredicates.path("/ReminderService/**")
                    .and(RequestPredicates.method(HttpMethod.OPTIONS)
                        .or(RequestPredicates.method(HttpMethod.POST))
                        .or(RequestPredicates.method(HttpMethod.GET))
                        .or(RequestPredicates.method(HttpMethod.PUT))
                        .or(RequestPredicates.method(HttpMethod.DELETE))
                        .or(RequestPredicates.method(HttpMethod.PATCH))),
                request -> jwtFilter.filter(request,
                    req -> HandlerFunctions.http("http://reminder-service:8085").handle(req)
                )
            )
            .build();
    }   
}