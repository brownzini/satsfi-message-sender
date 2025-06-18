import { Request, Response } from 'express';

import { getUserProfile } from '../../../firebase/services/Users';

const getUserWalletController = async(req:Request, res:Response): Promise<Response> =>{
    const handler = req.body.handler;

    if (!handler) {
      return res.status(401).json({
          message: "Handler invalid"
      })
    }

    try {
        
      await getUserProfile(handler).then(resp => {
        return res.status(200).json({
            wallet: resp.wallet,
            minNormalDonate: resp.minNormalDonate,
            minCreateSurvey: resp.minCreateSurvey,
            minToVote: resp.minToVote,
            minAmountToCall: resp.minAmountToCall,
        }).send();
      });

    } catch(err) {
        return res.status(401).json({
            message: "Handler is invalid or expired"
        })
    }  
}

export default getUserWalletController;