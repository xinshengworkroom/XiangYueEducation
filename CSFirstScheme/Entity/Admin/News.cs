using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSFirstScheme.Entity.Admin
{
    /// <summary>
    /// 新闻
    /// </summary>
    public class News
    {
        public Guid NewsId { get; set; }

        public DateTime CreateTime { get; set; }

        public string CreateBy { get; set; }
    }
}
