talk_pub <- function(auth, title, link = NULL, location, img, alt) {
  htmltools::tags$div(class="fancy-card",
                      htmltools::tags$header(
                        htmltools::tags$strong(auth),
                        htmltools::tags$a(
                          title,
                          href = ifelse(!is.null(link), link, "")
                        )
                      ),
                      htmltools::tags$p(location),
                      htmltools::tags$img(
                        src=paste0("inst/img/", img),
                        class="pubimg",
                        alt=paste0(title, " cover photo")
                      )
  )
}

job <- function(position, date, role, attrs) {
  htmltools::tags$div(class="job",
                      htmltools::tags$div(class="position", position),
                      htmltools::tags$div(class="date", date),
                      htmltools::tags$div(class="role", role),
                      htmltools::tags$div(class="role-attrs", attrs)
  )
}

skill <- function(skill, n) {
  htmltools::tags$div(class="skill-container",
    htmltools::tags$div(class="skill",
     htmltools::tags$div(class="skill-title", skill),
      htmltools::tags$div(class="bar-container",
       htmltools::tags$div(class="big-box", style=paste0("width:", n, "%;")),
       htmltools::tags$div(class="big-box", style=paste0("width:", 100-n, "%;"))
      ),
   )
)
}

award <- function(header, description) {
  htmltools::tags$div(class="description",
                      htmltools::tags$header(header),
                      htmltools::tags$p(description)
  )
}

education <- function(degree, school, duration) {
  htmltools::tags$div(class="description",
                      htmltools::tags$p(degree),
                      htmltools::tags$p(school),
                      htmltools::tags$p(duration)
  )
}