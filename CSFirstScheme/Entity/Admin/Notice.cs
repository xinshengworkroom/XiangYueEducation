using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSFirstScheme.Entity.Admin
{
    /// <summary>
    /// 通知
    /// </summary>
    public class Notice
    {
        public Guid NoticeId { get; set; }

        public DateTime CreateTime { get; set; }

        public string CreateBy { get; set; }
    }
}
