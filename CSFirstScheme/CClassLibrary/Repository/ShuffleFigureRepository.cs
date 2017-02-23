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
    public class ShuffleFigureRepository
    {
        CDBHelper db = new CDBHelper();

        public int Add(List<ShuffleFigure> list)
        {
            int rows = 0;
            foreach (ShuffleFigure item in list)
            {              
                rows += Add(item);
            }
            return rows;
        }

        public int Add(ShuffleFigure item)
        {
            return Add(new List<ShuffleFigure>() { item });
            string insertSql = @"Insert into [ShuffleFigure$](ShuffleFigureId,CreateTime,CreateBy) 
                                     values(@ShuffleFigureId,@CreateTime,@CreateBy)";

            OleDbParameter[] parameters = new OleDbParameter[] { 
                    new OleDbParameter("@ShuffleFigureId",item.ShuffleFigureId),
                    new OleDbParameter("@CreateTime",item.CreateTime),
                    new OleDbParameter("@CreateBy",item.CreateBy)                
                };

            return db.ExecuteNonQuery(insertSql, parameters);
        }

        public int Update(ShuffleFigure item)
        {
            return 0;
        }


        public int Delete()
        {
            return 0;

        }



        public List<ShuffleFigure> Select()
        {
            List<ShuffleFigure> list = new List<ShuffleFigure>();
            string sql = @"select * from [ShuffleFigure$]";
            DataTable dt = db.ExecuteTable(sql);
            if (dt != null && dt.Rows.Count > 0)
            {
                foreach (DataRow dr in dt.Rows)
                {
                    ShuffleFigure item = new ShuffleFigure();
                    item.ShuffleFigureId = new Guid(dr["ShuffleFigureId"].ToString());
                    item.CreateTime = DateTime.Parse(dr["CreateTime"].ToString());
                    item.CreateBy = dr["CreateBy"].ToString();
                    list.Add(item);
                }
            }
            return list;

        }
    }
}
