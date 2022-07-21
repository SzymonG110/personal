import Route, {RouteOutput} from '../Types/Route.type'

const contact = require('../../config/contact.json')
const langsandtools = require('../../config/langsandtools.json')
const projects = require('../../config/projects.json')

export default class HomeRoute extends Route {

    route = '/'

    async run(): Promise<RouteOutput> {

        return {

            file: 'home',
            data: {

                contact,
                langs: langsandtools.langs,
                tools: langsandtools.tools,
                projects: {
                    main: projects.main,
                    all: projects.all
                }

            }

        }

    }

}