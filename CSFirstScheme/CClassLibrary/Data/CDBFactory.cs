using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace CSFirstScheme.CClassLibrary.Data
{
    public class CDBFactory
    {
        public static string ExcelConnString = string.Format(ConfigurationManager.ConnectionStrings["ExcelConnection"].ToString(), HttpContext.Current.Server.MapPath("~/App_Data/FirstMiddle.xls"));
       
    }
}
