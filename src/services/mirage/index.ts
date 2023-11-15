import {createServer, Factory, Model, Response,ActiveModelSerializer} from 'miragejs';
import { faker } from '@faker-js/faker';

type User =
{
    name:string;
    email:string;
    created_at:string;
}

export function makeServer()
{
    const server = createServer({
        serializers:
        {
            application: ActiveModelSerializer
        },
        models:
        {
            //partial é do typescript - pode não usar todos os campos do USer
            user: Model.extend<Partial<User>>({})
        },

        //gera dados em massa
        factories:
        {   
            user:Factory.extend({
                name(i: number){ 
                    return `User ${i + 1}`
                },
                email(){ return faker.internet.email().toLowerCase() },
                //tem que ser em camel case
                createdAt(){ return faker.date.recent(10) }
            })
        },

        seeds(server)
        {
            server.createList('user', 200);
        },

        routes()
        {
            this.namespace= 'api';
 
            this.timing = 750;

            //shorthands do mirage
            this.get('/users', function (schema, request)
            {
                const {page=1, per_page=10} = request.queryParams;

                const total = schema.all('user').length;

                const pageStart = (Number(page) - 1 ) * Number(per_page);
                const pageEnd = Number(pageStart) + Number(per_page);

                const users = this.serialize(schema.all('user')).users.slice(pageStart,pageEnd )

                return new Response(
                    200,
                    {'x-total-count': String(total)},
                    {users}
                )
            });

            this.get('/users/:id');
            
            this.post('/users');

            this.namespace = "";

            //se não for identificado pelas rotas, elas passam normalmente
            this.passthrough();
        }
    })

    return server;
}