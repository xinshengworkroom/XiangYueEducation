using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FirstMiddleWeb.Startup))]
namespace FirstMiddleWeb
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
