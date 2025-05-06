import logging
from aiogram import Bot, Dispatcher, types
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.filters import Command
import asyncio
import os
from dotenv import load_dotenv

# Загружаем переменные окружения из .env файла
load_dotenv()

# Получаем токен из переменных окружения
BOT_TOKEN = os.getenv('BOT_TOKEN')

if not BOT_TOKEN:
    raise ValueError("BOT_TOKEN не найден в переменных окружения")

logging.basicConfig(level=logging.INFO)

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

async def send_welcome(message: types.Message):
    username = message.from_user.username or message.from_user.full_name or "User"
    text = f"महा AI मध्ये आपले स्वागत आहे.\n\n@{username}, खालील बटन वर क्लिक करून कृपया प्रश्नसंच सोडवा"
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="ॲप उघडा", url="http://t.me/mahaai_bot/MAHAAIQUIZ")]
        ]
    )
    await message.answer(text, reply_markup=keyboard)

async def support_handler(message: types.Message):
    text = "❓आपणास प्रश्नसंच बाबतीत काही त्रुटी किंवा मदत किंवा नवीन ऑफर जाणून घ्यायची असेल तर आमच्याशी संपर्क साधा."
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="संपर्क", url="https://t.me/mrcoolxaj")]
        ]
    )
    await message.answer(text, reply_markup=keyboard)

dp.message.register(send_welcome, Command("start"))
dp.message.register(support_handler, Command("support"))

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main()) 