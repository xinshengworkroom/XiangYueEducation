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
    public  class NoticeRepository
    {
        CDBHelper db = new CDBHelper();

        public int Add(List<Notice> list)
        {
            int rows = 0;
            foreach (Notice item in list)
            {
                string insertSql = @"Insert into [Notice$](NoticeId,CreateTime,CreateBy) 
                                     values(@NoticeId,@CreateTime,@CreateBy)";

                OleDbParameter[] parameters = new OleDbParameter[] { 
                    new OleDbParameter("@NoticeId",item.NoticeId),
                    new OleDbParameter("@CreateTime",item.CreateTime),
                    new OleDbParameter("@CreateBy",item.CreateBy)                
                };

                rows += db.ExecuteNonQuery(insertSql, parameters);
            }
            return rows;
        }

        public int Add(Notice item)
        {
            return Add(new List<Notice>() { item });

        }

        public int Update(Notice item)
        {
            return 0;
        }


        public int Delete()
        {
            return 0;

        }



        public List<Notice> Select()
        {
            List<Notice> list = new List<Notice>();
            string sql = @"select * from [Notice$]";
            DataTable dt = db.ExecuteTable(sql);
            if (dt != null && dt.Rows.Count > 0)
            {
                foreach (DataRow dr in dt.Rows)
                {
                    Notice item = new Notice();
                    item.NoticeId = new Guid(dr["NoticeId"].ToString());
                    item.CreateTime = DateTime.Parse(dr["CreateTime"].ToString());
                    item.CreateBy = dr["CreateBy"].ToString();
                    list.Add(item);
                }
            }
            return list;

        }
    }
}
