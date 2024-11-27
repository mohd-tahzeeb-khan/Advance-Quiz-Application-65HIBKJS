package com.quizapp.Quiz.App.FIlter;

import com.quizapp.Quiz.App.Entity.user;
import com.quizapp.Quiz.App.Services.userService;
import com.quizapp.Quiz.App.Utilies.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class jwtFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader=request.getHeader("Authorization");
        String username=null;
        String jwtToken=null;

        if(authHeader!=null && authHeader.startsWith("Bearer ")){
            jwtToken=authHeader.substring(7);
            username=jwtUtil.extractUseremai(jwtToken);
        }
        if(username!=null && !username.isEmpty()){
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if(jwtUtil.validateToken(jwtToken)){
                UsernamePasswordAuthenticationToken auth=new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(auth);
            }

        }
        filterChain.doFilter(request, response);
    }
}
