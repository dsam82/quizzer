package Controllers

import (
	"backend/Config"
	"backend/Models"
	"errors"
	"fmt"
	"math/rand"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func validateRequest(username, token string) bool {
	var validate Models.Auth
	if err := Config.DB.Where(&Models.Auth{Username: username, Token: token}).First(&validate).Error; err != nil {
		fmt.Println(err)
		return false
	}
	return true
}

func randSeq(n int) string {
	rand.Seed(time.Now().UnixNano())
	var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

func SignUp(c *gin.Context) {
	var user, preUser Models.User

	err := c.BindJSON(&user)
	if err != nil {
		c.AbortWithError(404, err)
		return
	}

	if err := Config.DB.Where("username = ?", user.Username).First(&preUser).Error; err == nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(201, gin.H{user.Username: "already exists. Try another"})
	} else if err := Config.DB.Where("email = ?", user.Email).First(&preUser).Error; err == nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(202, gin.H{user.Email: "already exists. Try another"})
	} else {
		user.Tutor = false
		hashed, _ := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
		user.Password = string(hashed)
		Config.DB.Create(&user)
		var auth Models.Auth
		auth.Username = user.Username
		auth.Token = randSeq(32)
		if err = Config.DB.Create(&auth).Error; err != nil {
			fmt.Println("error occured in token generation", err)
		}
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, auth.Token)
	}

}

func isTutor(username string) bool {
	var user Models.User

	if err := Config.DB.Where("username = ?", username).First(&user).Error; err != nil {
		return false
	} else {
		if user.Tutor {
			return true
		} else {
			return false
		}
	}
}

func Login(c *gin.Context) {
	var user, preUser Models.User

	err := c.BindJSON(&user)
	if err != nil {
		c.AbortWithError(404, err)
		return
	}

	if err := Config.DB.Where("username = ?", user.Username).First(&preUser).Error; err != nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(201, gin.H{user.Username: "doesn't exists."})
	} else {
		if err = bcrypt.CompareHashAndPassword([]byte(preUser.Password), []byte(user.Password)); err != nil {
			c.Header("access-control-allow-origin", "*")
			c.JSON(202, gin.H{user.Username: "incorrect password"})
		} else {
			var auth Models.Auth
			if err = Config.DB.Where("username = ?", user.Username).First(&auth).Error; err != nil {
				fmt.Println("unable to get auth token", err)
			}
			c.Header("access-control-allow-origin", "*")
			c.JSON(200, auth.Token)
		}
	}
}

func CreateQuestion(c *gin.Context) {
	var question Models.Questions
	err := c.BindJSON(&question)
	if err != nil {
		_ = c.AbortWithError(404, err)
		return
	}

	if validateRequest(c.Request.URL.Query().Get("Username"), c.Request.URL.Query().Get("Token")) {
		if isTutor(c.Request.URL.Query().Get("Username")) {
			if err = Config.DB.Create(&question).Error; err != nil {
				c.Header("access-control-allow-origin", "*")
				c.JSON(202, "Permission Denied")
			} else {
				c.Header("access-control-allow-origin", "*")
				c.JSON(200, "question created successfully")
			}
		} else {
			c.Header("access-control-allow-origin", "*")
			c.JSON(201, "Invalid token")
		}
	} else {
		c.Header("access-control-allow-origin", "*")
		_ = c.AbortWithError(400, errors.New("invalid request"))
	}

}

func GetQuestion(c *gin.Context) {
	var questions []Models.Questions
	var topic string
	q := c.Request.URL.Query()
	topic = q.Get("topic")

	if validateRequest(c.Request.URL.Query().Get("Username"), c.Request.URL.Query().Get("Token")) {
		if err := Config.DB.Where("topic = ?", topic).Find(&questions).Error; err != nil {
			c.Header("access-control-allow-origin", "*")
			_ = c.AbortWithError(400, errors.New("No Topic found"))
		} else {
			c.Header("access-control-allow-origin", "*")
			c.JSON(200, questions)
		}
	} else {
		c.Header("access-control-allow-origin", "*")
		_ = c.AbortWithError(202, errors.New("invalid request"))
	}
}
