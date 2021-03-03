Aplikacja backendowa napisana przy użyciu Node.js z wykorzystaniem frameworka Express i bazy danych MySQL.

Aby poprawnie uruchomić lokalnie aplikację należy mieć zainstalowanego Node oraz npm. Link do pobrania Node: https://nodejs.org/en/download/. W pierwszej kolejności należy zainstalować zależności komendą:

npm install

BAZA DANYCH
-----------

Użyliśmy następującej bazy danych: https://github.com/JeffSackmann/tennis_atp przedstawiającej dane i statystyki dotyczące męskich rankingów tenisowych na przestrzeni lat.

W celu stworzenia bazy danych uruchamiamy przygotowany skrypt tworzący bazę i odpowiednie tabele. Najpierw jednak należy podać dane dostępu do bazy danych, w pliku .\configuration\data\db.json a dopiero później uruchomić skrypt wpisując komendę:

node .\configuration\scripts\database-create.js

Następnie bazę trzeba wypełnić danymi. Podczas wstawiania dużej ilości danych może wystąpić problem (Error: read ECONNRESET at TCP.onStreamRead), dlatego na początku zaleca się zmianę parametru max_allowed_packet w pliku my.ini z domyślnego 1M na 64M (używając XAMPP-a w folderze xampp/mysql/bin/my.ini) i zrestartować MySQL. Później uruchamiamyjuż przygotowany skrypt parsujący dane w formacie .csv (Uwaga, to może chwilę zająć ;)) wpisując komendę:

node .\configuration\scripts\insert-data.js

BACKEND
-------

Sam backend uruchamiamy komendą:

node .\server.js lub nodemon .\server.js (jeśli chcemy mieć live reload)