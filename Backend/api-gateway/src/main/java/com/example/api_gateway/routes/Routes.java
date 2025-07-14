/*
 * This class is responsible for redirecting HTTP requests 
 * received by the API-Gateway to the responsible microservices.
 * It also applies JWT authentication filters to protected 
 * services.
 */

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

    private final JwtFilter jwtFilter;

    // Base URLs for each backend microservice, injected from application properties
    @Value("${AUTHENTICATION_SERVICE_URL}")
    private String authServiceURL;
    @Value("${LOGGING_SERVICE_URL}")
    private String loggingServiceURL;
    @Value("${NOTIFICATION_SERVICE_URL}")
    private String notificationServiceURL;
    @Value("${REMINDER_SERVICE_URL}")
    private String reminderServiceURL;

    // Inject JwtFilter to apply it on protected service routes
    public Routes(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    /**
     * Defines the route mappings between API Gateway 
     * endpoints and backend services. Applies JWT filtering 
     * to protected routes (Except for authentication service).
     * 
     * @return RouterFunction that handles HTTP routing logic
     */
    @Bean
    public RouterFunction<ServerResponse> userServiceRoute() {
        return GatewayRouterFunctions.route("api-gateway")

            // Routes for AuthenticationService (no auth filter)
            .route(
                RequestPredicates.path("/AuthenticationService/**")
                    .and(RequestPredicates.method(HttpMethod.OPTIONS)
                        .or(RequestPredicates.method(HttpMethod.POST))
                        .or(RequestPredicates.method(HttpMethod.GET))),
                HandlerFunctions.http(authServiceURL)
            )

            // Routes for LoggingService (requires JWT filter)
            .route(
                RequestPredicates.path("/LoggingService/**")
                    .and(RequestPredicates.method(HttpMethod.OPTIONS)
                        .or(RequestPredicates.method(HttpMethod.POST))
                        .or(RequestPredicates.method(HttpMethod.GET))),
                request -> jwtFilter.filter(request,
                    req -> HandlerFunctions.http(loggingServiceURL).handle(req)
                )
            )

            // Routes for NotificationService (requires JWT filter)
            .route(
                RequestPredicates.path("/NotificationService/**")
                    .and(RequestPredicates.method(HttpMethod.OPTIONS)
                        .or(RequestPredicates.method(HttpMethod.POST))
                        .or(RequestPredicates.method(HttpMethod.PUT))
                        .or(RequestPredicates.method(HttpMethod.PATCH))
                        .or(RequestPredicates.method(HttpMethod.DELETE))
                        .or(RequestPredicates.method(HttpMethod.GET))),
                request -> jwtFilter.filter(request,
                    req -> HandlerFunctions.http(notificationServiceURL).handle(req)
                )
            )

            // Routes for ReminderService (requires JWT filter)
            .route(
                RequestPredicates.path("/ReminderService/**")
                    .and(RequestPredicates.method(HttpMethod.OPTIONS)
                        .or(RequestPredicates.method(HttpMethod.POST))
                        .or(RequestPredicates.method(HttpMethod.GET))
                        .or(RequestPredicates.method(HttpMethod.PUT))
                        .or(RequestPredicates.method(HttpMethod.DELETE))
                        .or(RequestPredicates.method(HttpMethod.PATCH))),
                request -> jwtFilter.filter(request,
                    req -> HandlerFunctions.http(reminderServiceURL).handle(req)
                )
            )

            // Build the final route configuration
            .build();
    }   
}