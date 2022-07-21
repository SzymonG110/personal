import express from 'express'
import {readdirSync} from 'fs'
import Route from './Types/Route.type'

export class Index {

    app: express.Application = express()
    port: number = 8006

    constructor() {

        this.setup()
        this.hanlder()
        this.listen()

    }

    private setup() {

        this.app.set('view engine', 'pug')
        this.app.set('views', `${__dirname}/../views`)
        this.app.use(express.static(`${__dirname}/../public`))

        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}))

    }

    private hanlder(): void {

        const table: (Omit<Route, 'run'> & { filePath: string })[] = []

        readdirSync(`${__dirname}/Routes`).filter(fileName => !fileName.startsWith('--') && fileName.endsWith('.route.js')).forEach((file: string) => {

            const route: Route = new (require(`${__dirname}/Routes/${file}`).default)

            this.app.get(route.route, async (req: express.Request, res: express.Response, next: express.NextFunction) => {

                const response = await route.run(req, res, next)
                res.render(response.file, response.data)

            })

            table.push({
                route: route.route,
                filePath: `/${file}`
            })

        })

        console.table(table)

    }

    private listen() {

        this.app.listen(this.port, () => {

            console.log(`Personal web page is running on port ${this.port}`)

        })

    }

}

new Index()