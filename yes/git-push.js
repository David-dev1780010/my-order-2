import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

async function pushToGitHub() {
  try {
    console.log("Инициализация Git репозитория...")
    await execAsync("git init")

    console.log("Добавление удаленного репозитория...")
    await execAsync("git remote add origin https://github.com/David-dev1780010/my-order-2.git")

    console.log("Добавление всех файлов...")
    await execAsync("git add .")

    console.log("Создание коммита...")
    await execAsync('git commit -m "Добавлен проект MAHA-AI Telegram Mini App"')

    console.log("Отправка изменений в репозиторий...")
    await execAsync("git push -u origin main --force")

    console.log("Успешно! Изменения отправлены в репозиторий.")
  } catch (error) {
    console.error("Произошла ошибка:", error.message)

    if (error.message.includes("Authentication failed")) {
      console.log("\nДля отправки изменений в репозиторий вам потребуется аутентификация.")
      console.log("Пожалуйста, выполните следующие шаги:")
      console.log("1. Создайте персональный токен доступа (PAT) на GitHub:")
      console.log("   - Перейдите в Settings > Developer settings > Personal access tokens")
      console.log("   - Создайте токен с правами на репозиторий")
      console.log("2. Используйте токен вместо пароля при запросе учетных данных")
      console.log("3. Или настройте SSH ключ для GitHub")
    }
  }
}

pushToGitHub()
