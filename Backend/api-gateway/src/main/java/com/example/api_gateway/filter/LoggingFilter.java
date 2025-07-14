/*
 * This class is responsible for logging the HTTP requests
 * received by the API gatewat from the frontend. 
 */

package com.example.api_gateway.filter;

import java.io.IOException;

import org.springframework.stereotype.Component;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;

@Component  // Registers this class as a spring-managed component
public class LoggingFilter implements Filter {

    /**
     * Intercepts every incoming HTTP request and logs its method and URI.
     * 
     * @param request  the incoming servlet request
     * @param response the outgoing servlet response
     * @param chain    the filter chain to pass control to the next filter
     */
    @Override
    public void doFilter(
            jakarta.servlet.ServletRequest request,
            jakarta.servlet.ServletResponse response,
            FilterChain chain
    ) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        System.out.println("➡️ Gateway received: " + req.getMethod() + " " + req.getRequestURI());
        chain.doFilter(request, response);
    }
}
