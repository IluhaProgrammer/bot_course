const TeleframApi = require('node-telegram-bot-api')
const { againOptions, gameOptions } = require('./options')

const token = '6162781146:AAHf2qnt449z5dXIoEJNcObGAp-0OfhZkj4'

const bot = new TeleframApi(token, {polling: true})

const chats = {}

const again = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас яя загадаю число от 0 до 9,  а ты его попробуешь отгадать')
        const rundomNumber = Math.floor(Math.random() * 10)
        chats[chatId] = rundomNumber;
        return bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}

const start = () => {

bot.setMyCommands([
    {command: '/start', description: 'Начальное приветсвие'},
    {command: '/info', description: 'Информация о пользователе'},
    {command: '/game', description: 'Игра угадай число'},
])

bot.on('message', async msg => {
    const text = msg.text
    const chatId = msg.chat.id
    if(text === '/start') {
        await  bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/192/2.webp')
        return  bot.sendMessage(chatId, 'Добро пожаловать в телеграм бота, автор бота DashaBubli4')
    }
    if(text === '/info') {
       return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`)
    }
    if(text === '/game') {
       return  again(chatId)
    }
    return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй другую команду!')
    
})

bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if(data === '/again') {
       return  again(chatId)
    }
    if(data === chats[chatId]) {
        return await bot.sendMessage(chatId, `Поздравляю, ты отгадал число ${chats[chatId]}`, againOptions)
    } else {
        return await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал число ${chats[chatId]}`, againOptions)
    }
})

}

start()