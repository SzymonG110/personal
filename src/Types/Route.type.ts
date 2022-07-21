import {NextFunction, Request, Response} from 'express'

export interface RouteOutput {

    file: string
    data?: {

        [x: string]: any

    }

}

export default abstract class Route {

    abstract route: string

    abstract run(req: Request, res: Response, next: NextFunction): Promise<RouteOutput>

}