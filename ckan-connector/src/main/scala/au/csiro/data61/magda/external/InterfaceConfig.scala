package au.csiro.data61.magda.external

import com.typesafe.config.Config
import java.net.URL
import au.csiro.data61.magda.external.ExternalInterface.ExternalInterfaceType
import au.csiro.data61.magda.external.ExternalInterface.ExternalInterfaceType._

case class InterfaceConfig(
  name: String,
  interfaceType: ExternalInterfaceType,
  baseUrl: URL,
  pageSize: Long,
  landingPageUrl: (String*) => String,
  fakeConfig: Option[FakeConfig],
  raw: Config)

case class FakeConfig(
  datasetPath: String,
  mimeType: String)

object InterfaceConfig {
  def apply(config: Config): InterfaceConfig = {
    val isFaked = config.hasPath("isFaked") && config.getBoolean("isFaked")

    new InterfaceConfig(
      name = config.getString("name"),
      interfaceType = ExternalInterfaceType.withName(config.getString("type")),
      baseUrl = new URL(config.getString("baseUrl")),
      pageSize = config.getLong("pageSize"),
      landingPageUrl = strings => config.getString("landingPageTemplate").format(strings: _*),
      fakeConfig = {
        if (isFaked && config.hasPath("fake"))
          Some(new FakeConfig(
            config.getString("fake.dataFilePath"),
            config.getString("fake.mimeType")))
        else None
      },
      raw = config
    )
  }
}