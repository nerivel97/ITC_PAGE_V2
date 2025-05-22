<?php

namespace Core;

use PDO;
use PDOStatement;

class Database {
    private PDO $connection;
    private PDOStatement $statement;

    public function __construct(array $config, string $username, string $password) {
        $dsn = 'mysql:' . http_build_query($config, '', ';');

        $this->connection = new PDO($dsn, $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }

    public function query(string $query, array $params = []): Database {
        $this->statement = $this->connection->prepare($query);
        $this->statement->execute($params);

        return $this;
    }

    public function find(): mixed {
        return $this->statement->fetch();
    }

    public function findOrFail(): mixed {
        $result = $this->find();

        if (!$result) {
            abort();
        }

        return $result;
    }

    public function findMany(): mixed {
        return $this->statement->fetchAll();
    }
}
