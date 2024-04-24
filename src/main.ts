import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

//троли пидорасы
async function start(){
    const PORT = process.env.PORT || 4444;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder().setTitle('AquaRENT server')
        .setDescription('REST API for aqua-rent app')
        .setVersion('1.0.0')
        .addTag('zashita').build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/api/docs", app, document)

    await app.listen(PORT, () => console.log(` server started on port ${PORT}`))
}

start();