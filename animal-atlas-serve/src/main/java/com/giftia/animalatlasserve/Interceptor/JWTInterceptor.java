package com.giftia.animalatlasserve.Interceptor;

import com.alibaba.fastjson2.JSON;
import com.auth0.jwt.exceptions.AlgorithmMismatchException;
import com.auth0.jwt.exceptions.InvalidClaimException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.giftia.animalatlasserve.common.Auth;
import com.giftia.animalatlasserve.common.Code;
import com.giftia.animalatlasserve.common.Result;
import com.giftia.animalatlasserve.common.TokenThreadLocal;
import com.giftia.animalatlasserve.domain.User;
import com.giftia.animalatlasserve.service.UserService;
import com.giftia.animalatlasserve.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.List;

@Component
public class JWTInterceptor implements HandlerInterceptor {
    @Autowired
    UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //获取token
        String token = request.getHeader("Authorization");
        TokenThreadLocal.put(token);
        Auth annotation = null;
        if (!(handler instanceof HandlerMethod)) return true;
        //获得注解信息
        annotation = ((HandlerMethod) handler).getMethodAnnotation(Auth.class);

        if (annotation == null) return true;
        List<String> requiredAuth = List.of(annotation.value());

        String msg;
        Integer code;
        try {
            DecodedJWT jwt = JWTUtil.verifyToken(token);//调用token解析的工具类进行解析
            String userAuth = jwt.getClaim("role").asString();
            if (requiredAuth.contains(userAuth))
                return true;  //请求放行
            else {
                User user = userService.getById(jwt.getClaim("id").asString());
                if (requiredAuth.contains(user.getRole())) {
                    //重新发token
                    return true;
                }
                msg = "权限不足";
                code = Code.TOKEN_NOAUTH;
            }
        } catch (SignatureVerificationException e) {
            e.printStackTrace();
            msg = "无效token";
            code = Code.TOKEN_ERROR;
        } catch (TokenExpiredException e) {
            e.printStackTrace();
            msg = "token过期";
            code = Code.TOKEN_ERROR;
        } catch (AlgorithmMismatchException e) {
            e.printStackTrace();
            msg = "无效token";
            code = Code.TOKEN_ERROR;
        } catch (InvalidClaimException e) {
            e.printStackTrace();
            msg = "无效token";
            code = Code.TOKEN_ERROR;
        } catch (Exception e) {
            e.printStackTrace();
            msg = "未登录";
            code = Code.TOKEN_ERROR;
        }
        String jsonString = JSON.toJSONString(Result.error(msg, code));
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(jsonString);
        return false;  //异常不放行
    }

}