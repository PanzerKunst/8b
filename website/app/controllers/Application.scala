package controllers

import play.api.mvc._

object Application extends Controller {

  val doNotCachePage = Array(CACHE_CONTROL -> "no-cache, no-store")

  def index = Action { request =>
    Ok(views.html.index())
  }

  def projects = Action { request =>
    Redirect("/", 301)
  }

  def appearShowroom = Action { request =>
    Ok(views.html.appearShowroom())
  }

  def siteDiary = Action { request =>
    Ok(views.html.siteDiary())
  }

  def trainDamage = Action { request =>
    Ok(views.html.trainDamage())
  }
}
