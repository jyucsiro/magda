name := "magda-metadata-common"

resolvers += Resolver.bintrayRepo("monsanto", "maven")
resolvers += Resolver.sonatypeRepo("releases")

libraryDependencies ++= {
  val akkaV       = "2.4.9"
  val scalaTestV  = "3.0.1"
  Seq(
       "com.typesafe.akka" %% "akka-actor" % akkaV,
       "com.typesafe.akka" %% "akka-stream" % akkaV,
       "com.typesafe.akka" %% "akka-contrib" % akkaV,
       "com.typesafe.akka" %% "akka-http-experimental" % akkaV,
       "com.typesafe.akka" %% "akka-http-spray-json-experimental" % akkaV,
       "com.typesafe.akka" %% "akka-slf4j" % akkaV,
       "ch.qos.logback" % "logback-classic" % "1.1.3",
       "com.monsanto.labs" %% "mwundo" % "0.1.0" exclude("xerces", "xercesImpl"),
       "org.scalaz" %% "scalaz-core" % "7.2.8",
   		 "com.sksamuel.elastic4s" %% "elastic4s-core" % "5.2.4",
   		 "com.sksamuel.elastic4s" %% "elastic4s-tcp" % "5.2.4",
   		 "com.sksamuel.elastic4s" %% "elastic4s-play-json" % "5.2.4",

       "org.scalatest" %% "scalatest" % scalaTestV % "test",
       "org.scalamock" %% "scalamock-scalatest-support" % "3.2.2" % "test",
       "com.fortysevendeg" %% "scalacheck-datetime" % "0.2.0" % "test",
       "com.sun.jna" % "jna" % "3.0.9"
     )
}