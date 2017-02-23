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
    public class ProductRepository
    {
        CDBHelper db = new CDBHelper();

        public int Add(List<Product> list)
        {
            int rows = 0;
            foreach (Product item in list)
            {
                string insertSql = @"Insert into [Product$](ProductId,CreateTime,CreateBy) 
                                     values(@ProductId,@CreateTime,@CreateBy)";

                OleDbParameter[] parameters = new OleDbParameter[] { 
                    new OleDbParameter("@ProductId",item.ProductId),
                    new OleDbParameter("@CreateTime",item.CreateTime),
                    new OleDbParameter("@CreateBy",item.CreateBy)                
                };

                rows += db.ExecuteNonQuery(insertSql, parameters);
            }
            return rows;
        }

        public int Add(Product item)
        {
            return Add(new List<Product>() { item });

        }

        public int Update(Product item)
        {
            return 0;
        }


        public int Delete()
        {
            return 0;

        }



        public List<Product> Select()
        {
            List<Product> list = new List<Product>();
            string sql = @"select * from [Product$]";
            DataTable dt = db.ExecuteTable(sql);
            if (dt != null && dt.Rows.Count > 0)
            {
                foreach (DataRow dr in dt.Rows)
                {
                    Product item = new Product();
                    item.ProductId = new Guid(dr["ProductId"].ToString());
                    item.CreateTime = DateTime.Parse(dr["CreateTime"].ToString());
                    item.CreateBy = dr["CreateBy"].ToString();
                    list.Add(item);
                }
            }
            return list;
        }
    }
}
