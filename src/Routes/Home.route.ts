import Route, {RouteOutput} from '../Types/Route.type'

const contact = require('../../config/contact.json')
const {langs, tools} = require('../../config/langsandtools.json')
const {projects} = require('../../config/projects.json')

export default class HomeRoute extends Route {

    route = '/'

    async run(): Promise<RouteOutput> {

        return {

            file: 'home',
            data: {

                contact,
                langs,
                tools,
                projects

            }

        }

    }

}