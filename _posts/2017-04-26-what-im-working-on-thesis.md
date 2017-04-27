---
title:  "What I'm working on: MSc thesis"
date:   2017-04-26 00:01 +0300
layout: post
excerpt_separator: "<!--END_EXCERPT-->"
---

As I briefly mentioned in the previous blog post "Changing fields", I'm writing my thesis on educational data mining and learning analytics.<!--END_EXCERPT--> But those fields are quite large[^1] so I figured I'd explain my topic in slightly more detail.

[^1]: There's even an argument to be made that the distinction between the fields is very arbitrary and they are in practice the same thing.


The title of my thesis is one of those word monsters that tend to exist only in the domain on thesis names: "*Using element-level website usage data to improve online learning materials and predict learning outcomes*". 

The data for the thesis comes from a JavaScript component embedded into an online learning material used in a programming course. The component -- called "Pheromones" --  collects log data of how students behave in the material. We log what the elements the student has visible on their screen after every scroll event, and every 2.5 seconds in case the students are not mobing the screen. We also log every click made in the material. If the student stays idle for a sufficiently long time, we pause the logging and resume when the screen is interacted with.

My thesis then takes the data collected using this tool and analyses, combines it with some other data and then does science on it.

First, I use the data to identify areas where the students keep returning to all the time. The hypothesis is that such areas are very important and/or have difficult content in them. We can also identify areas where students never come back: either they are easy or the students see them as irrelevant. A preliminary analysis suggested that students tended to ignore everything that has to do with good coding practices and keep returning to places where new syntax and features of the language are presented.

Second, I check whether the time students spend with assignment prompts on their screens correlate with self-reported perceptions of assignment difficulty, workload or educational value. Spoiler alert: they do not. once the others are corrected for. I believe this to be caused by a phenomena where in very difficult cases the students start searching for information from elsewhere, causing them to spend less time looking at the prompt.

Third, I attempt to predict student learning outcomes based on their movement statistics. Just knowing the per-student proprotions of where the students spend their times (in other words, discarding information about student effort) allows for fairly strong predictions of the total course scores of the students.

As the techniques used in my thesis are not really dependent on the programming education environment, I have a strong belief that they can be applied to other subjects as well. But that's for future work to determine.

For more details on the first research question, check out "*Using and Collecting Fine-Grained Usage Data to Improve Online Learning Materials*" once the ICSE 2017 proceedings come out. There's also other some other stuff related to my thesis in review for various conferences, but only time will tell when/if those get published.

As for the thesis itself, it'll be available online once it's accepted. The timeline for that has been "one or two more weeks" for the last four months, so it should get finished any minute now :)