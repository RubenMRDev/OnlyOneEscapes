# CEI Battle Royale

**CEI Battle Royale** is a dynamic web-based project inspired by the **Wheel of Doom** concept. Players' fates are decided through dice rolls, and the participant with the highest score wins the combat.

[Click here to view the live project](#)  


## 📸 Screenshots  

![Homepage Screenshot](path-to-image.jpg)  
_Description of the screenshot_

---

## 🚀 Features  

- **Wheel of Doom Inspired Gameplay**: Decide who lives or dies with the roll of a dice.
- **Interactive User Interface**: Engaging and easy-to-use interface for seamless participation.
- **Dynamic Feedback**: Real-time updates on dice rolls and round winners.

---

## 🛠️ Technologies  

This project utilizes the following technologies:  

- **HTML5**  
- **CSS3**  
- **JavaScript**  
- **Bootstrap**
- **SweetAlert**

---

## 👥 Team Members  

- **Judith Tamayo** - Scrum Master  
- **Pablo Noria** - Product Owner  
- **Pablo Jiménez**  - Programmer
- **Rubén Martin**  - Programmer
- **Nicolas Burgos**  - Programmer

---

## 📂 Project Setup  

1. Clone the repository:  
   ```bash
   git clone https://github.com/RubenMRDev/WheelOfDoom.git
   ```
2. Navigate to the project folder:  
   ```bash
   cd WheelOfDoom
   ```
3. Open the `index.html` file in your browser to preview the application locally.

---

## 🚀 **Next Steps: New Features**

### 🕹️ **Fast Mode**
If players want a faster experience without interruptions between rounds, you can implement a **"Fast Mode"**. In this mode, matchups and dice rolls are done automatically without the need for player intervention between rounds.

**How would it work?**
- **Automatic Matchmaking**: The system automatically pairs up players for the rounds without the user having to click a button.
- **Automatic Rolls**: Dice rolls are performed instantly, without waiting for players to roll manually.
- **Automatic Advancements**: After each round, the player who wins advances to the next round without confirmation.

This mode will allow players to enjoy faster rounds and continue with the tournament without interruptions.

**Potential Benefits**:
- **Faster gameplay**.
- **Less intervention**: Ideal for those who prefer to play without manual interaction between each round.
- **Fluid gameplay**: Perfect for shorter sessions or when players want to experience multiple tournaments quickly.

---

### 🏆 **Leaderboard or Final Ranking Table**
To enhance competition and motivation, you can add a **leaderboard** that shows the **highest scores** from all the tournaments played. This will allow players to see their performance over time and compare themselves with other participants.

**Leaderboard Features**:
- **Global Ranking**: A general ranking with the highest scores from all players across all tournaments.
- **Tournament-Specific Ranking**: A table that shows how players performed in each individual tournament, allowing them to see their rank in specific events.
- **Score Details**: The leaderboard should include the player’s name, the score obtained, and their position in the ranking.
- **Automatic Updates**: After each tournament, the leaderboard updates automatically to reflect the most recent player scores.

**Benefits of the Leaderboard**:
- **Encourages competition**: Players will want to improve their scores and climb the ranking.
- **Additional motivation**: Players are incentivized to participate in more tournaments to improve their position on the table.
- **Progress tracking**: Players can track their performance over several tournaments.

**How to Implement?**
- You could store player scores and rankings in a local file or a database (if you decide to make it online) to persist data between game sessions.
- Display the leaderboard at the end of the game or in a dedicated section of the website or app.

---

### 💬 **Feedback Messages During the Game**
Throughout the game, it's essential to provide **interactive feedback messages** that guide players through the entire process, from matchmaking to the end of the tournament. We use **SweetAlert** to show interactive and engaging alerts that enhance the user experience and keep the game smooth.

---

### 📢 **Keep in mind that these steps are optional, but adding them will increase interactivity and competition in the game.**

