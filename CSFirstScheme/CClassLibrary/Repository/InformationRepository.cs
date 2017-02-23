using CSFirstScheme.CClassLibrary.Data;
using CSFirstScheme.Entity.Admin;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSFirstScheme.CClassLibrary.Repository
{
    public class InformationRepository
    {
        CDBHelper db = new CDBHelper();

        public int Add(List<Information> list)
        {
            int rows = 0;
            foreach (Information item in list)
            {
                string insertSql = @"Insert into [Information$](InformationId,CreateTime,CreateBy) 
                                     values(@InformationId,@CreateTime,@CreateBy)";

                OleDbParameter[] parameters = new OleDbParameter[] { 
                    new OleDbParameter("@InformationId",item.InformationId),
                    new OleDbParameter("@CreateTime",item.CreateTime),
                    new OleDbParameter("@CreateBy",item.CreateBy)                
                };

                rows += db.ExecuteNonQuery(insertSql, parameters);
            }
            return rows;
        }

        public int Add(Information item)
        {
            return Add(new List<Information>() { item });

        }

        public int Update(Information item)
        {
            return 0;
        }


        public int Delete()
        {
            return 0;

        }



        public List<Information> Select()
        {
            List<Information> list = new List<Information>();
            string sql = @"select * from [Information$]";
            DataTable dt = db.ExecuteTable(sql);
            if (dt != null && dt.Rows.Count > 0)
            {
                foreach (DataRow dr in dt.Rows)
                {
                    Information item = new Information();
                    item.InformationId = new Guid(dr["InformationId"].ToString());
                    item.CreateTime = DateTime.Parse(dr["CreateTime"].ToString());
                    item.CreateBy = dr["CreateBy"].ToString();
                    list.Add(item);
                }
            }
            return list;
        }
    }
}
