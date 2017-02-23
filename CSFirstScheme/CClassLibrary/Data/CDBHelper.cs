using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSFirstScheme.CClassLibrary.Data
{
    public class CDBHelper
    {
        public CDBHelper() {
            _connString = CDBFactory.ExcelConnString;
        }

        public CDBHelper(string connString)
        {
            _connString = connString;
        }

        string _connString;

        static OleDbConnection _conn; 
        private OleDbConnection Conn
        {
            get
            {
                if (_conn == null) {
                    _conn = new OleDbConnection(_connString);                    
                }
                switch (_conn.State)
                { 
                    case ConnectionState.Closed:
                        _conn.Open();
                        break;
                    case ConnectionState.Broken:
                        _conn.Close();
                        _conn.Open();
                        break;
                }

                return _conn;
            }
        }


        private OleDbCommand CreateCommand(string strSql, OleDbParameter[] parameters)
        {
            OleDbCommand cmd = new OleDbCommand(strSql, Conn);
            if (parameters != null && parameters.Length > 0) 
            {
                cmd.Parameters.AddRange(parameters);
            }
            return cmd;
        }


        public DataSet ExecuteDateSet(string strSql)
        {
            return ExecuteDateSet(strSql, null);
        }

        public DataSet ExecuteDateSet(string strSql,OleDbParameter[] parameters)
        {
            try
            {
                OleDbCommand cmd = CreateCommand(strSql,parameters);
                OleDbDataAdapter adapter = new OleDbDataAdapter(cmd);
                DataSet ds = new DataSet();
                adapter.Fill(ds);
                return ds;
            }
            catch (Exception ex)
            {                 
                return null;
            }
        }


        public DataTable ExecuteTable(string strSql)
        {
            return ExecuteDateSet(strSql).Tables[0];
        }

        public DataTable ExecuteTable(string strSql, OleDbParameter[] parameters)
        {
            return ExecuteDateSet(strSql, parameters).Tables[0];
        }




        public int ExecuteNonQuery(string strSql)
        {
            return ExecuteNonQuery(strSql, null);
        }




        public int ExecuteNonQuery(string strSql, OleDbParameter[] parameters)
        {
            try
            {
                OleDbCommand cmd = CreateCommand(strSql, parameters);
                return cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
    }
}
