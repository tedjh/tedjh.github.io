---
layout: project
title: "Study Course Builder"
tagline: "Generate personalised learning courses from a PDF or webpage using Claude, then study them in a local web viewer."
date: 2025-09-10
featured: false
thumbnail: /assets/images/projects/example_course_mech_interp_small.png
links:
  - {label: "Github",  url: "https://github.com/tedjh/course_builder"}
---

The idea behind this project was that quite often resources (i.e. books, papers, webpages etc) that we would like to study are not well presented. This can lead to us giving up on trying to learn the content. This tool is therefore aimed at breaking the content down into manageable chapters, with additional exercises and context, and presents the content as an easy to navigate website.

<figure>
  <img src="/assets/images/projects/example_course_mech_interp.png" alt="Mech Interp course page">
  <figcaption>Front page of 10 Chapter course on Mechanistic Interpretability</figcaption>
</figure>

In particular the codebase includes two packages, where the first applies Claude (requiring Claude API access) to inspect the resource that you wish to study. It will design a learning course made up of a series of chapters for you, including consultation with you to ensure it matches your needs.

The second package contains the web app functionality for viewing the course. More details about how to use these packages can be found in the codebases README.md.

Here is an example front page of a course I built based on a <a href="https://www.neelnanda.io/mechanistic-interpretability/glossary">webpage</a> by Neel Nanda on the topic of mechanistic interpretability in machine learning.

<figure>
  <img src="/assets/images/projects/example_course_mech_interp_second_page.png" alt="Mech Interp course page">
  <figcaption>Example content inside one of the chapters.</figcaption>
</figure>
