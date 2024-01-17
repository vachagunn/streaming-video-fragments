const express = require('express');
const fs = require('fs'); // доступ к файловой системе

const app = express() // создание нового приложения

const videoFileMap = {
    'earth': 'videos/earth.mp4', // ключ-значение (имя файла-полный путь)
    'ocean': 'videos/ocean.mp4',
    'waves': 'videos/waves.mp4'
}

app.get('/videos/:filename', (req, res) => { // обработка запроса и ответа
    res.setHeader('Cache-Control', 'no-store'); // Отключение кэширования на сервере
    const fileName = req.params.filename; // params: { filename: 'earth' }
    const filePath = videoFileMap[fileName]; // 'videos/earth.mp4'
    console.log('FILE_PATH: ', filePath);

    if (!filePath) {
        return res.status(404).send('File not found');
    }

    const stat = fs.statSync(filePath); // получаем статистику файла Stats {}
    const fileSize = stat.size;         // Stats {size: 9840497}
    const range = req.headers.range;    // bytes=0-
    console.log(req.headers);           // {range: 'bytes=0-',}

    if (range) {
        const CHUNK_SIZE = 10 ** 6; // 1MB
        console.log('CHUNK_SIZE:', CHUNK_SIZE)            // 1000000
        
        const start = parseInt(range.replace(/\D/g, "")); // D - только цифры (остальное заменяет пустой строкой), g - нахождение всех совпадений, а не только первое
        console.log('START: ', start);                    // 0

        const end = Math.min(start + CHUNK_SIZE, fileSize - 1); // min(1000000, 9840496)
        console.log('END: ', end);                              // 1000000

        const contentLength = end - start + 1; // Иначе последний чанк не придет, который меньше 1 MB

        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': contentLength,
            'Content-Type': 'video/mp4'
        };
        
        res.writeHead(206, head);
        const videoStream = fs.createReadStream(filePath, {start, end});
        videoStream.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
        };

        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res); // открываем поток и читаем содержимое файла
    }
});

app.listen(3000, () => { // слушатель (запуск сервера)
    console.log('Server listening on post 3000');
});