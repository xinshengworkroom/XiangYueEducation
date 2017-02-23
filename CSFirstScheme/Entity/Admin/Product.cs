using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSFirstScheme.Entity.Admin
{
    /// <summary>
    /// 产品信息
    /// </summary>
    public class Product
    {
        public Guid ProductId { get; set; }

        public DateTime CreateTime { get; set; }

        public string CreateBy { get; set; }
    }
}
