import schemas from '../schema/signuop_validator.js';
import uid_generator from '../functions/uid_generator.js';
import hasher from '../functions/hasher.js';
import date_generator from '../functions/date_generator.js';

export default async function (fastify, opts) {
    fastify.post('/signup', schemas.signupData , (request, reply) => {
        let {
            username,
            password,
            email,
            store_name,
            is_notification,
        } = request.body
        password = hasher(password);
       let account_creation_date = date_generator();

        let uid = uid_generator();
        const data = [uid, username, password, email,
            store_name,
            0, null,
            is_notification,
            account_creation_date, true, username, email];
        let query = "INSERT INTO `pointofsales`.`user_accounts` (`ID`, `USERNAME`, `PASSWORD`, `EMAIL`, `STORE_NAME`, `SUBSCRIPTION_ID`, `SUBSCRIPTION_DATE`, `IS_NOTIFICATION`, `ACCOUNT_CREATION_DATE`, `IS_EXIST`) "
            + "VALUES (?,?,?,?,?, ?, ?, ?, ?, ?)";
        query = fastify.mysql.format(query, data);
        fastify.mysql.query(query, (err, result) => {
            if (err) {
                if (err['errno'] === 1062) {
                    reply.code(409).send({ "message": "Account creation faled...Something went wrong with database server", "error_code": err["code"], "error_no": err["errno"] })
                } else {
                    reply.code(500).send({ "message": "Something went wrong with database.", "error_code": err["code"], "error_no": err["errno"] })
    }
            } else {
    reply.send({ "status_code": 200, "affectedRow": result['affectedRows'] });
}

        })
console.log(request.body);
    })
}