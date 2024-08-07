import { Injectable, Request, UnauthorizedException } from "@nestjs/common"; 
import { PassportStrategy } from "@nestjs/passport"; 
import { Strategy } from "passport-custom"; 

@Injectable() 
export class ApplySessionStrategy extends PassportStrategy(Strategy, 'applySession') { 
  async validate(@Request() req): Promise<any> { 

    const { passport: { user } } = req.session; 

    if (!user) { 
      throw new UnauthorizedException(); 
    } 
    const { user_id, username } = user; 
    return { 
      user_id, 
      username, 
    }; 
  } 
} 