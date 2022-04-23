const database = require("./models/db");
const Produto = require("./models/produto");
const User = require("./models/user");

async function createProduto(){
    const resultadoCreate = await Produto.create({
        nome: "mouse",
        preco: 10,
        descricao: "Um mouse qualquer"
    });
}

async function criarUsuario(email, senha){
    const userCreate = await User.create({
        email: email,
        password: senha
    });
}

async function fazerLogin(email, password){
    const user = await User.findOne({where: {email: email}});
    const usuario_existe = (user !== null);

    if (!usuario_existe){
        console.log(`${email} => usuario nao existe`);
        return false;
    } 
    const senha_igual = (user.password === password);
    console.log(`LOGIN ${email} USER OK -> pass:${user.password}`);
    return senha_igual && usuario_existe;
}

function main(){
    (async () => {
        try {
            const resultado = await database.sync();
            createProduto();
            criarUsuario("janderson_bonitao@gmail", "abc123");
            
            fazerLogin("ffjanderson@gmail.com", "");
            const loginA = await fazerLogin("janderson_bonitao@gmail", "");
            const loginB = await fazerLogin("janderson_bonitao@gmail", "abc123");
            console.log(`call a: ${loginA}`);
            console.log(`call b: ${loginB}`);

        } catch (error) {
            console.log(error);
        }
    })();
}

main();