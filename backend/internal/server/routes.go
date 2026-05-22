package server

import (
	"imagine_backend/internal/handler"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		api.GET("/health", handler.HealthCheck)
	}
}
