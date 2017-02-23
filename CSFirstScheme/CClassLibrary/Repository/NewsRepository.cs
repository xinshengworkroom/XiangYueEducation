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
    public class NewsRepository
    {
        CDBHelper db = new CDBHelper();

        public int Add(List<News> list)
        {
            int rows = 0;
            foreach (News item in list)
            {
                string insertSql = @"Insert into [News$](NewsId,CreateTime,CreateBy) 
                                     values(@NewsId,@CreateTime,@CreateBy)";

                OleDbParameter[] parameters = new OleDbParameter[] { 
                    new OleDbParameter("@NewsId",item.NewsId),
                    new OleDbParameter("@CreateTime",item.CreateTime),
                    new OleDbParameter("@CreateBy",item.CreateBy)                
                };

                rows += db.ExecuteNonQuery(insertSql, parameters);
            }
            return rows;
        }

        public int Add(News item)
        {
            return Add(new List<News>() { item });

        }

        public int Update(News item)
        {
            return 0;
        }


        public int Delete()
        {
            return 0;

        }



        public List<News> Select()
        {
            List<News> list = new List<News>();
            string sql = @"select * from [News$]";
            DataTable dt = db.ExecuteTable(sql);
            if (dt != null && dt.Rows.Count > 0)
            {
                foreach (DataRow dr in dt.Rows)
                {
                    News item = new News();
                    item.NewsId = new Guid(dr["NewsId"].ToString());
                    item.CreateTime = DateTime.Parse(dr["CreateTime"].ToString());
                    item.CreateBy = dr["CreateBy"].ToString();
                    list.Add(item);
                }
            }
            return list;
        }
    }
}
