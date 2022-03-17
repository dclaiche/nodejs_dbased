-- Data Manipulation Queires Group 28 : Devon Claiche and Matthew Gehring

-- -- Get all player data to populate table
SELECT * FROM Players;
-- -- Get all game data to populate table
SELECT * FROM Games;
-- -- Get all premium member data to populate table
SELECT * FROM Premium_Membership_Status;
-- -- Get all messages data to populate table
SELECT * FROM Messages;

-- Get all player data based on player_id input
SELECT * FROM Players where player_id = :id

-- Get players who have played :num amount of games
SELECT player_id, email, password, games, wins, losses FROM Players WHERE games = :num

-- Get player and game id where player is the winner
SELECT player_id, game_id FROM Players 
INNER JOIN Player_Has_Games ON Players.player_id = Player_Has_Games.players_player_id 
INNER JOIN Games ON Games.game_id = Player_Has_Games.games_game_id 
WHERE winner = player_id;

-- Update player attributes based on player_id
UPDATE Player SET player_id = :player_id, email = :email, password = :password, games = :games, wins = :wins, losses = :losses WHERE player_id = :player_ID_input_in_browser_updatebox;

-- -- Query for add a new player functionality.
-- -- colon : character being used to denote the variables 

INSERT INTO `Players` (email, password, games, wins, losses)
VALUES (:email_input, :password_hash_input, :games_input, :wins_input, :losses_input);

-- -- Query for add a new Game functionality.
-- -- colon : character being used to denote the variables 

INSERT INTO `Games` (time_played, duration, player_1, player_2, winner, socket_id, active_game)
VALUES (:time_played_input, :duration_input, :player_1_input, :player_2_input, :winner_input, :socket_id_input, :active_game_input);

-- Query for add a new Message functionality.
-- colon : character being used to denote the variables 

INSERT INTO `Messages` (chat_message, timestamp, players_player_id, games_chat_id)
VALUES (:chat_message_input, :timestamp_input, :players_player_id_input, :games_game_id_input);

-- Query for add a new Premium Membership Status functionality.
-- colon : character being used to denote the variables 

INSERT INTO `Premium_Membership_Status` (players_player_id, premium_status, next_payment)
VALUES (:players_player_id_input, :premium_status_input, :next_payment_input);

-- Query for add a new player has games relationship functionality.
-- colon : character being used to denote the variables 

INSERT INTO `Player_Has_Games` (players_player_id, games_game_id)
VALUES (:players_player_id_input, :games_game_id_input);

-- delete a player
DELETE FROM Players WHERE player_id = :player_id_selected_from_front_end

-- delete a game
DELETE FROM Games WHERE game_id = :game_id_selected_from_front_end

-- delete a message
DELETE FROM Messages WHERE chat_message_id = :chat_message_id_selected_from_front_end

-- delete a premium membership
DELETE FROM Premium_Membership_Status where players_player_id = :players_player_id_selected_from_front_end

-- dis-associate a game from a player (M-to-M relationship deletion)
DELETE FROM Player_Has_Games WHERE players_player_id = :players_player_id_selected_from_front_end AND games_game_id = :games_game_id_selected_from_front_end
