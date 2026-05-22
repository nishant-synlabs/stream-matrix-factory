package main

import (
	"imagine_backend/config"
	"imagine_backend/internal/db"
	"log"
)

func main() {
	config.LoadConfig()
	db.ConnectToDB()
	sqlDB, err := db.DB.DB()
	if err != nil {
		log.Fatalf("Failed to get SQL DB: %v", err)
	}
	defer func() {
		if err := sqlDB.Close(); err != nil {
			log.Printf("Error closing DB: %v", err)
		}
	}()

	log.Printf("Connected to database: %v", db.DB.Dialector.Name())

	err = db.DB.AutoMigrate()
	if err != nil {
		log.Fatal(err)
	}
	log.Println("All models migrated successfully")
}
